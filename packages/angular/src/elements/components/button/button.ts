import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { Output, EventEmitter, Component, Input } from "@angular/core";

import { buttonService } from "./button.service";
import IonRippleEffect from "../ripple-effect";
import "./button.css";

@Component({
  selector: "ion-button, IonButton",
  template: `
    <ng-container>
      <ng-container *ngIf="href === undefined">
        <button [class]="classes.base" (focus)="onFocus()" (blur)="onBlur()">
          <span class="button-inner">
            <ng-content select="[icon-only]"></ng-content>

            <ng-content select="[start]"></ng-content>

            <ng-content></ng-content>

            <ng-content select="[end]"></ng-content>
          </span>

          <ng-container *ngIf='mode === "md"'>
            <IonRippleEffect [type]="rippleType"></IonRippleEffect>
          </ng-container>
        </button>
      </ng-container>

      <ng-container *ngIf="href !== undefined">
        <a
          [class]="classes.base"
          [attr.href]="href"
          (focus)="onFocus()"
          (blur)="onBlur()"
        >
          <span class="button-inner">
            <ng-content select="[icon-only]"></ng-content>

            <ng-content select="[start]"></ng-content>

            <ng-content></ng-content>

            <ng-content select="[end]"></ng-content>
          </span>
        </a>
      </ng-container>
    </ng-container>
  `,
})
export class IonButton {
  @Input() mode: any;
  @Input() disabled: any;
  @Input() className: any;
  @Input() fill: any;
  @Input() hasIconOnly: any;
  @Input() inToolbar: any;
  @Input() href: any;

  @Output() ionFocus = new EventEmitter();
  @Output() ionBlur = new EventEmitter();

  get classes() {
    return buttonService.getClasses(this.mode, this.disabled, this.className);
  }
  get hasIconOnly() {
    return this.slotIconOnly !== undefined;
  }
  get rippleType() {
    const hasClearFill = this.fill === undefined || this.fill === "clear";

    // If the button is in a toolbar, has a clear fill (which is the default)
    // and only has an icon we use the unbounded "circular" ripple effect
    // if (hasClearFill && props.hasIconOnly && props.inToolbar) {
    //   return 'unbounded';
    // }
    if (this.hasIconOnly) {
      return "unbounded";
    }
    return "bounded";
  }
  onFocus() {
    this.ionFocus.emit();
  }
  onBlur() {
    this.ionBlur.emit();
  }
}

@NgModule({
  declarations: [IonButton],
  imports: [CommonModule, IonRippleEffectModule],
  exports: [IonButton],
})
export class IonButtonModule {}
