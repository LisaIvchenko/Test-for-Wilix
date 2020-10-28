import { Validators } from '@angular/forms';

export const amountValidator = () => Validators.pattern(/^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/);
