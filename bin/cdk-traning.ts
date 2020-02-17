#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { TadaVpc, TadaEKSCluster } from '../lib/cdk-traning-stack';

const app = new cdk.App();
const vpc = new TadaVpc(app, 'TadaVPC');
const cluster = new TadaEKSCluster(app, 'TadaEKSCluster', {
  vpc: vpc.vpc
})
