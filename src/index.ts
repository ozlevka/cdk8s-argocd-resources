import { ApiObject, GroupVersionKind } from 'cdk8s';
import { Construct } from 'constructs';
import * as k8s from './imports/k8s';
export * as k8s from './imports/k8s';

export interface ApplicationSource {
  readonly repoURL?: string;
  readonly chart?: string;
  readonly targetRevision?: string;
  readonly path?: string;
  readonly directory?: ApplicationDirectory;
  readonly plugin?: ApplicationPlugin;
  readonly helm?: HelmOptions;
  readonly ref?: string;

}

export interface ApplicationDirectory {
  readonly recurse?: boolean;
}

export interface ApplicationPlugin {
  readonly name?: string;
  readonly env?: k8s.EnvVar[];
}

export interface ApplicationDestination {
  readonly server?: string;
  readonly namespace?: string;
  readonly name?: string;
}

export interface SyncPolicyAutomated {
  readonly prune?: boolean;
  readonly selfHeal?: boolean;
  readonly allowEmpty?: boolean;
}

export interface RetryBackoff {
  readonly duration?: string;
  readonly factor?: number;
  readonly maxDuration?: string;
}

export interface SyncRetry {
  readonly limit?: number;
  readonly backoff?: RetryBackoff;
}

export interface ApplicationSyncPolicy {
  readonly automated?: SyncPolicyAutomated;
  readonly syncOptions?: string[];
  readonly retry?: SyncRetry;
}

export interface ArgoCdApplicationSpec {
  readonly project?: string;
  readonly source?: ApplicationSource;
  readonly sources?: ApplicationSource[];
  readonly destination?: ApplicationDestination;
  readonly syncPolicy?: ApplicationSyncPolicy;
  readonly ignoreDifferences?: ResourceIgnoreDifferences[];
}

export interface HelmOptions {
  readonly valueFiles?: string[];
  readonly values?: { [key: string]: string };
  readonly releaseName?: string;
  readonly version?: string;
  readonly repo?: string;
  readonly targetRevision?: string;
  readonly helmVersion?: string;
  readonly helmOptions?: string[];
  readonly verify?: boolean;
  readonly wait?: boolean;
  readonly timeout?: string;
  readonly force?: boolean;
  readonly install?: boolean;
  readonly upgrade?: boolean;
  readonly lint?: boolean;
  readonly valuesFrom?: HelmValuesFromSource[];
}

export interface HelmValuesFromSource {
  readonly kind?: string;
  readonly name?: string;
  readonly namespace?: string;
  readonly group?: string;
  readonly version?: string;
  readonly jsonPointers?: string[];
  readonly jqPathExpressions?: string[];
  readonly values?: { [key: string]: string };
}

export interface ResourceIgnoreDifferences {
  readonly jsonPointers?: string[];
  readonly jqPathExpressions?: string[];
  readonly kind?: string;
  readonly name?: string;
  readonly namespace?: string;
  readonly group?: string;
  readonly server?: string;
}

export interface ProjectRoles {
  readonly name?: string;
  readonly description?: string;
  readonly policies?: string[];
  readonly groups?: string[];
}

export interface ResourceRef {
  readonly group?: string;
  readonly kind?: string;
}

export interface ArgoCdProjectSpec {
  readonly description?: string;
  readonly sourceRepos?: string[];
  readonly destination?: ApplicationDestination[];
  readonly clusterResourceWhiteList?: ResourceRef[];
  readonly namespaceResourceBlacklist?: ResourceRef[];
  readonly namespaceResourceWhitelist?: ResourceRef[];
  readonly roles?: ProjectRoles[];
}


export interface ArgoCdApplicationProps {
  readonly metadata?: k8s.ObjectMeta;
  readonly spec?: ArgoCdApplicationSpec;
}
export interface ArgoCdProjectProps {
  readonly metadata?: k8s.ObjectMeta;
  readonly spec?: ArgoCdProjectSpec;
}

export class ArgoCdProject extends ApiObject {
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'argoproj.io/v1alpha1',
    kind: 'AppProject',
  };
  /**
     * Renders a Kubernetes manifest for an ingress object. https://github.com/kubernetes-sigs/aws-load-balancer-controller
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
  public static manifest(props: ArgoCdProjectProps): any {
    return {
      ...ArgoCdProject.GVK,
      ...props,
    };
  }

  /**
     * Defines an "extentions" API object for AWS Load Balancer Controller - https://github.com/kubernetes-sigs/aws-load-balancer-controller
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
  public constructor(scope: Construct, id: string, props: ArgoCdProjectProps) {
    super(scope, id, ArgoCdProject.manifest(props));
  }
}

export class ArgoCdApplication extends ApiObject {
  public static readonly GVK: GroupVersionKind = {
    apiVersion: 'argoproj.io/v1alpha1',
    kind: 'Application',
  };
  /**
     * Renders a Kubernetes manifest for an ingress object. https://github.com/kubernetes-sigs/aws-load-balancer-controller
     *
     * This can be used to inline resource manifests inside other objects (e.g. as templates).
     *
     * @param props initialization props
     */
  public static manifest(props: ArgoCdApplicationProps): any {
    return {
      ...ArgoCdApplication.GVK,
      ...props,
    };
  }

  /**
     * Defines an "extentions" API object for AWS Load Balancer Controller - https://github.com/kubernetes-sigs/aws-load-balancer-controller
     * @param scope the scope in which to define this object
     * @param id a scope-local name for the object
     * @param props initialization props
     */
  public constructor(scope: Construct, id: string, props: ArgoCdApplicationProps) {
    super(scope, id, ArgoCdApplication.manifest(props));
  }
}
