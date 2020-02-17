#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkTraningStack } from '../lib/cdk-traning-stack';

const app = new cdk.App();
new CdkTraningStack(app, 'CdkTraningStack');
