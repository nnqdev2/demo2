import { AbstractControl } from '@angular/forms';


export class IncidentValidators {
  static selectOneOrMoreMedia(control: AbstractControl) {
    const groundWater = control.get('groundWater');
    const surfaceWater = control.get('surfaceWater');
    const drinkingWater = control.get('drinkingWater');
    const soil = control.get('soil');
    const vapor = control.get('vapor');
    const freeProduct = control.get('freeProduct');

    console.error('************selectOneOrMoreMedia');
    console.error(groundWater.value + surfaceWater.value + drinkingWater.value + soil.value + vapor.value + freeProduct.value);

    if (groundWater.value || surfaceWater.value || drinkingWater.value || soil.value || vapor.value || freeProduct.value ) {
      console.error('************selectOneOrMoreMedia at least one value checked');
      return null;
    } else {
      console.error('************selectOneOrMoreMedia no value checked');
      return { nomatch: true };
    }
    // return email.value === confirm.value ? null : { nomatch: true };
  }
}
