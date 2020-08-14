import { Route } from '@angular/router';
export declare type WizardSteps = WizardStep[];
export declare type WizardControls = WizardControl[];
export interface WizardStep extends Route {
  data?: WizardStepData;
  children?: WizardSteps;
}

export interface WizardStepData {
  heading: string; // step heading
  controls: WizardControl[];
  secondaryContent?: {
    component: any;
    data?: { [key: string]: any };
    class?: string;
  };
}

export interface WizardControl {
  name: string; // label for action
  path?: string; // path where action takes user (optional)
  class?: string; // class to be added to control (optional)
  type: 'next' | 'prev' | 'cancel' | 'save' | 'close'; // type of action (determines icon and can be used for custom triggers)
}
