import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-df-input',
  templateUrl: './df-input.component.html',
  styleUrls: ['./df-input.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DfInputComponent },
  ],
})
export class DfInputComponent {
  @Input() placeholder: string;
  @Input() value: string;
  @Input() iconClass: string | undefined;
  @Input() iconPosition: string | undefined;
  @Input() cssClass: string | undefined;

  @Output() valueChange: EventEmitter<string>;
  @Output() change: EventEmitter<Event>;
  @Output() input: EventEmitter<InputEvent | Event>;

  onChange: (newValue: string) => void;
  onTouched: () => void;

  touched: boolean;
  disabled: boolean;

  get iconPos(): Record<string, any> {
    return { [`icon-${this.iconPosition}`]: !!this.iconPosition };
  }

  constructor() {
    this.valueChange = new EventEmitter();
    this.change = new EventEmitter();
    this.input = new EventEmitter();
    this.onChange = (newValue: string) => {};
    this.onTouched = () => {};
    this.touched = false;
    this.disabled = false;
    this.placeholder = '';
    this.value = '';
  }

  onInput(event: InputEvent | Event) {
    this.input.emit(event);
  }

  onChanged(event: Event) {
    this.change.emit(event);
  }

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(onChange: (newValue: string) => void) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
