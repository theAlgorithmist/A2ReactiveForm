/** 
 * Copyright 2016 Jim Armstrong (www.algorithmist.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Component, OnInit, OnDestroy } from '@angular/core';

import { 
         FORM_DIRECTIVES,
         REACTIVE_FORM_DIRECTIVES,
         FormBuilder,
         FormGroup,
         AbstractControl,
         FormControl,
         Validators
       } from '@angular/forms';

 // check form input properties as the user types
 import { PasswordStrength    } from './lib/validators/PasswordStrength';
 import { CCValidator         } from './lib/validators/CCValidator';
 import { CCTypes             } from './lib/validators/CCTypes';

 // custom validators
 import { nameValidator       } from './lib/validators/NameValidator';
 import { emailValidator      } from './lib/validators/EmailValidator';
 import { passwordValidator   } from './lib/validators/PasswordValidator';
 import { creditCardValidator } from './lib/validators/CreditCardValidator';
 import { expireValidator     } from './lib/validators/ExpireValidator';

// template is in-lined in this demo as it makes the overall code easier to deconstruct
@Component({
  moduleId: module.id,
  selector: 'app-root',
  directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
  template: 
  `
<!-- Angular 2 RC4 form validation demo -->
<div class="container-fluid rounded">

  <div class="row">
    <img class="img-responsive logo-img" src="eyes.png">
    <div>
      <span class="pull-left">The Algorithmist</span>
      <span class="pull-right">Form Demo</span>
    </div>
  </div>

  <div class="row form-centered form-pad-top">
    <h1 class='pass'>CREATE AN ACCOUNT</h1>  
  </div>

  <div class="row form-content">
    <form [formGroup]="_accountForm" (submit)="__onAccountFormSubmit(_accountForm.value)">
      <div class="form-group" [class.has-error]="!_name.valid && _name.touched" [class.has-success]="_name.valid && _name.touched">
        <label for="fullname">Full Name</label>
        <input class="form-control input" id="fullname" [formControl]="_name" size="20" placeholder="Your Name" type="text" required>
        <div *ngIf="_name.hasError('lengthInvalid')" class="form-error-message">Please enter first and last name</div>
        <div *ngIf="_name.hasError('nameRequired')" class="form-error-message">Full name is required</div>
        <div *ngIf="_name.hasError('invalidChars')" class="form-error-message">Use letters only in name</div>
      </div>

      <div class="form-group" [class.has-error]="!_email.valid && _email.touched" [class.has-success]="_email.valid && _email.touched">
        <label for="email">Email address</label>
        <input class="form-control input" id="email" size="20" [formControl]="_email" placeholder="Enter Email" type="text" required>
        <div *ngIf="_email.hasError('invalidFormat')" class="form-error-message">Email requires '.' and '@' characters</div>
        <div *ngIf="_email.hasError('invalidDomain')" class="form-error-message">Please enter correct domain</div>
      </div>
        
      <div class="form-group" [class.has-error]="!_password.valid && _password.touched" [class.has-success]="_password.valid && _password.touched">
        <label for="password">Password: Minimum 8 chars with at least one number and one special character</label>
        <input class="form-control input" id="password" size="20" [formControl]="_password" [style.background-color]="_color" 
               placeholder="Enter Password" type="{{_passInputType}}" required>
        <span>{{_passStrength}}</span><a style="float:right;" (click)="__onShowPassword()">{{_showPasswordTxt}}</a>
        <div *ngIf="_password.hasError('invalidLength')" class="form-error-message">Insufficient length</div>
        <div *ngIf="_password.hasError('minNumber')" class="form-error-message">At least one number</div>
        <div *ngIf="_password.hasError('minChar')" class="form-error-message">At least one character (a-z/A-Z)</div>
        <div *ngIf="_password.hasError('specialChar')" class="form-error-message">At least one special character</div>
      </div>

      <div class="form-group">
        <div class="checkbox login-remember">
          <label> <input value="remember" checked="checked" type="checkbox" [formControl]="_remember"> Remember Me </label>
        </div>
      </div>

      <hr/>

      <div class="form-group" [class.has-error]="!_credit.valid && _credit.touched" [class.has-success]="_credit.valid && _credit.touched">
        <label>Card Number</label>
        <div>
          <img src="{{_ccImgSrc}}" width="40" height="25"> <span> &nbsp; {{_selectedCard}} </span>
          <input class="form-control" required type="number" id="creditcard" [formControl]="_credit" placeholder="Credit Card Number" required>
          <div *ngIf="_credit.hasError('minLength')" class="form-error-message">Not Enough CC Digits</div>
          <div *ngIf="_credit.hasError('invalid')" class="form-error-message">Invalid Credit Card Number</div>
        </div>
      </div>
                 
      <div class="form-group" [class.has-error]="!_expire.valid && _expire.touched" [class.has-success]="_expire.valid && _expire.touched">
        <label>Expires (mm/yy)</label>
        <input required type="text" id="expire" class="form-control" [formControl]="_expire" placeholder="Exp. Date" required>
         <div *ngIf="_expire.hasError('minLength')" class="form-error-message">Month and Year Required</div>
         <div *ngIf="_expire.hasError('invalid')" class="form-error-message">Invalid Expiration Date</div>
      </div>

      <div class="form-group">
        <input class="btn btn-block btn-lg btn-primary" value="SUBMIT INFORMATION" type="submit">
        <div *ngIf="_accountForm.valid" class="form-success-message">Form is completely valid.</div>
        <div *ngIf="!_accountForm.valid" class="form-error-message">Please correct highlighted or empty fields</div>
      </div>

    </form>
  </div>     
</div>
  `
})

// root component, name generated by Angular CLI
export class AppComponent implements OnInit, OnDestroy
{
  private _accountForm: FormGroup;     // Form Group

  private _selectedCard: string;       // selected card name, i.e. AMEX, MASTERCARD, etc.
  private _passStrength: string;       // password strength indication, i.e. 'good', 'strong', etc.
  private _showPasswordTxt: string;    // show or hide password text
  private _passInputType: string;      // type attibute, 'text' or 'password'
  private _showPassword: boolean;      // true if showing password, false if hiding it
  private _passStrengthVal: number;    // password strength (0-100)
  private _color: string;              // hex color code associated with password 
  private _ccImgSrc: string;           // img 'src' attribute to dynamically switch the credit-card image based on the computed card type
  
  // form controls
  private _name: AbstractControl;      // user's full name
  private _email: AbstractControl;     // user's email address
  private _password: AbstractControl;  // user's account password
  private _remember: AbstractControl;  // 'remember me'
  private _credit: AbstractControl;    // credit card number
  private _expire: AbstractControl;    // expiration date

  // references to Disposables from subscription
  private _passSub: any;
  private _creditSub: any;

 /**
  * Construct a new root (form demo) component
  *
  * @param _passwordStrenthIndicator: Injected password strength indicator to measure password strength as user types
  *
  * @param _formBuilder: FormBuiler - Injected form builder 
  *
  * @return nothing This is the root component of the demo. 
  */
  constructor( private _passwordStrengthIndicator: PasswordStrength, private _formBuilder: FormBuilder )
  {
    this._selectedCard    = "Card: NONE";
    this._passStrength    = "Strength: None"
    this._showPasswordTxt = "Show Password"; 
    this._passInputType   = "password";
    this._showPassword    = false;
    this._passStrengthVal = 0;
    this._color           = "#ffffff";
    this._ccImgSrc        = "creditcard.png";

    this._accountForm = _formBuilder.group({
       '_name'    : new FormControl('', Validators.compose([Validators.required, nameValidator      ])),
       '_email'   : new FormControl('', Validators.compose([Validators.required, emailValidator     ])),
       '_password': new FormControl('', Validators.compose([Validators.required, passwordValidator  ])),
       '_remember': new FormControl(''),
       '_credit'  : new FormControl('', Validators.compose([Validators.required, creditCardValidator])),
       '_expire'  : new FormControl('', Validators.compose([Validators.required, expireValidator    ]))
     });

     this._name     = this._accountForm.controls['_name'    ];
     this._email    = this._accountForm.controls['_email'   ];
     this._password = this._accountForm.controls['_password'];
     this._remember = this._accountForm.controls['_remember'];
     this._credit   = this._accountForm.controls['_credit'  ];
     this._expire   = this._accountForm.controls['_expire'  ];

     // assign form field observers - this is the reactive part of the demo (essentially, we converted some very old-school
     // event-handlers like key-up to Observers and tied them into Angular's form change detection)

     // only the 'onNext' handler is provided in this demo - 'onError' and 'onComplete' could be added as an exercise
     this._passSub = this._password.valueChanges.subscribe(
       (value:string) => this.__onPassword(value)
     );
 
     this._creditSub = this._credit.valueChanges.subscribe(
       (value:number) => this.__onCCNumber(value)
     );
  }

  public ngOnInit()
  {
    // lifecycle method placeholder
  }

  public ngOnDestroy()
  {
    // this is not absolutely necessary for the demo, but is good practice for creating a robust, reusable component
    this._passSub.unsubscribe();
    
    this._creditSub.unsubscribe();
  }

  // handle form submission
  private __onAccountFormSubmit(value:Object):void
  {
    // you can extract the form values from the input Object or as below
    if( this._accountForm.valid ) 
    {
      console.log("FORM SUBMISSION\n");

      console.log( "Name       : ", this._name.value              );
      console.log( "Email      : ", this._email.value             );
      console.log( "Passowrd   : ", this._password.value          );
      console.log( "Remember Me: ", this._remember.value === true );
      console.log( "Credit Card: ", this._credit.value            );
      console.log( "Expires    : ", this._expire.value            );  // the form allows different formats, so may want to clean this up
    }
  }

  // toggle show-password link and the type attribute of the password input field
  private __onShowPassword():void
  {
    this._showPassword = !this._showPassword;

    if( this._showPassword )
    {
      this._showPasswordTxt = "Hide Password";
      this._passInputType   = "text";
    }
    else 
    {
      this._showPasswordTxt = "Show Password";
      this._passInputType   = "password";
    }
  }

  // evaluate password strength on password change - exercise: make this more generic and injectable
  private __onPassword(value:string): void
  {
    this._passStrengthVal = this._passwordStrengthIndicator.measure(value);

    if( this._passStrengthVal == 0 ) 
    {
      this._passStrength = "Strength: None";
      this._color        = "#ffffff";
    }
    else if( this._passStrengthVal <= 20 ) 
    {
      this._passStrength = "Strength: Weak";
      this._color        = "#EEB4B4";
    }
    else if( this._passStrengthVal <= 40 ) 
    {
      this._passStrength = "Strength: Better";
      this._color        = "#FFF8DC";
    }
    else if( this._passStrengthVal <= 65 ) 
    {
      this._passStrength = "Strength: Good";
      this._color = "#E8F1D4";
    }
    else if( this._passStrengthVal <= 90 ) 
    {
      this._passStrength = "Strength: Very Good";
      this._color        = "#D4ED91";
    }
    else 
    {
      this._passStrength = "The Force is strong with this one";
      this._color        = "#ADFF2F";
    }
  }

  // evaluate credit-card type as the CC number changes
  private __onCCNumber(value: number): void
  {
    if (value == null || isNaN(value) || !isFinite(value))
      return;

    var cardType: string = CCValidator.getCardType( value.toString() );

    switch (cardType)
    {
      case CCTypes.AMERICAN_EXPRESS:
        this._ccImgSrc     = "amex.png";
        this._selectedCard = "American Express";
      break;

      case CCTypes.DISCOVER:
        this._ccImgSrc     = "discover.png";
        this._selectedCard = "Discover";
      break;

      case CCTypes.MASTERCARD:
        this._ccImgSrc     = "mastercard.png";
        this._selectedCard = "Mastercard";
      break;

      case CCTypes.VISA:
        this._ccImgSrc     = "visa.png";
        this._selectedCard = "Visa";
      break;

      case CCTypes.NONE:
        this._ccImgSrc     = "creditcard.png";
        this._selectedCard = "None";
      break;
    }
  }
}
