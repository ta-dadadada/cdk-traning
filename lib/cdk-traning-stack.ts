import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as eks from '@aws-cdk/aws-eks';
import * as ec2 from '@aws-cdk/aws-ec2'

export class TadaVpc extends cdk.Stack {
  public readonly vpc: ec2.Vpc;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    this.vpc = new ec2.Vpc(this, 'ExampleVpc', {
      cidr: '10.1.0.0/16',
      maxAzs: 3,
      natGateways: 1,
      subnetConfiguration: [
        {
          cidrMask: 19,
          name: 'ingress',
          subnetType: ec2.SubnetType.PUBLIC
        },
        {
          cidrMask: 19,
          name: 'backends',
          subnetType: ec2.SubnetType.PRIVATE
        },
      ]
    });
  }
}

interface EKSClusteProps extends cdk.StackProps {
  vpc: ec2.IVpc;
}


export class TadaEKSCluster extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: EKSClusteProps) {
    super(scope, id, props);

    const clusterAdmin = new iam.Role(this, 'AdminRole', {
      assumedBy: new iam.AccountRootPrincipal()
    });

    const cluster = new eks.Cluster(this, 'Cluster', {
      vpc: props.vpc,
      mastersRole: clusterAdmin,
      defaultCapacity: 0,
    });

    cluster.addCapacity('DefaultNodeGroup', {
      maxCapacity: 1,
      instanceType: new ec2.InstanceType('t2.medium'),
      bootstrapOptions: {
        kubeletExtraArgs: '--node-labels foo=bar'
      },
    });
  }
}