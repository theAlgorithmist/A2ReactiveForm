import { bootstrap                 } from '@angular/platform-browser-dynamic';
import { enableProdMode            } from '@angular/core';
import { AppComponent, environment } from './app/';
import { PasswordStrength          } from './app/lib/validators/PasswordStrength';
import { FormBuilder               } from '@angular/forms';

if (environment.production) 
{
  enableProdMode();
}

bootstrap(AppComponent, [PasswordStrength, FormBuilder]);

