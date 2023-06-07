import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Component, Input } from "@angular/core";

import "./button.css";
import { rippleEffectService } from "./ripple-effect.service";

@Component({
  selector: "ion-ripple-effect, IonRippleEffect",
  template: `
    <div role="presentation" [class]="classes.base"></div>
  `,
})
export class IonRippleEffect {
  @Input() mode: any;
  @Input() type: any;
  @Input() className: any;

  get classes() {
    return rippleEffectService.getClasses(this.mode, this.type, this.className);
  }
}

@NgModule({
  declarations: [IonRippleEffect],
  imports: [CommonModule],
  exports: [IonRippleEffect],
})
export class IonRippleEffectModule {}
