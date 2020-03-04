# Angular 2 (RC4) Reactive Form Validation Demo

This demo expands on a prior one that demonstrated several Typescript Math Toolkit custom form validators for Angular 2.  That demo was created with a beta version of Angular 2 and before the CLI went into beta.  Since recent changes to the release candidate have depracated some form features, it seemd worthwhile to upgrade the demo.  I also thought it would be useful to simultaneously upgrade some of the prior event handlers to Observers to illustrate how to subscribe to automatic form changes inside Angular 2.


The Angular CLI was used to scaffold the project as well as build/serve the demo.  The html template used in this demo is largely the same; it has been updated to work with the latest release candidate.  The custom validators have been made slightly more robust and were moved to app/lib/validators.  When the Typescript Math Toolkit is finally open-sourced, I envision installation via npm and integrating into an Angular 2 project just like any other npm library.


Each custom validator returns results that can be direct-wired into the template and messages are revealed using _*ngIf_.  Success or failure for each field is indicated through the use of Bootstrap classes that are dynamically switched in the template.  You could, of course, use Semantic UI or your own custom CSS.  So, if the user fails to properly fill out one field and then tabs to the next field, the incorrect field is highlighted in a reddish color and the relevant error message is displayed underneath.  If that field is properly filled out, it is highlighted in a greenish color when the user moves onto the next input.  The overall validity of the form is dynamically displayed at the bottom of the UI.


Once the form data is submitted, the results from each control are written to the console.  


Some of the demo features include

```sh
- Dynamically switch Bootstrap classes based on control validity
- Create custom validators in Typescript (alpha TSMT validators are used as an example)
- Compose custom valildators with Angular-supplied validators
- Use *ngIf in tandem with validator return info. to display real-time error or hint messages to aid in form completion
- Illustrate a show/hide password facility with binding applied to input type attribute and anchor text
- Illusrate how to implement a real-time password strength indicator with animated color display
- Show how to validate credit-card numbers for theoretical accuracy
- Show how to determine the type of credit card and dynamically display an image of that card type
- Processing of all form controls on submission
```

Author:  Jim Armstrong - [The Algorithmist]

@algorithmist

theAlgorithmist [at] gmail [dot] com

Angular 2: RC4

Angular CLI: 1.0 Beta 9

## Installation

Installation involves all the usual suspects

  - npm, typings, and Angular CLI installed globally
  - Clone the repository
  - npm install
  - get coffee (this is the most important step)

## Goals

The goals of this demo are 

* Illustrate usage of Typescript Math Toolkit computational classes in an actual application setting
* Add to the body of knowledge on how to create and run Angular 2/Typescript applications
* Show how to implement complex, custom form validators in Angular 2 
* Show to do implement validate-as-you-type in an Angular 2 form using Observers
* Provide an example of a real-time password strength indicator
* Create an excuse for another cup of coffee

I hope that you find something instructive from the code and are interested in improving the demo in some way.

### Version
1.0.0

### Building and Running the demo

After installation, _ng-build_ and _ng-serve_ are your friends.  Build production or dev. as you see fit.  localhost:4200 to run the demo, at which point you should see

![Image of Form Demo]
(http://algorithmist.net/image/form.png)

Notice that inputs prior to the credit card number are properly filled out.  The Bootsrap _has-success_ class is applied to those controls.  The credit card is identified as a Mastercard, but the number is not properly formatted.  This is computed using both a length check and Luhn's algorithm with (alpha) code from the Typescript Math Toolkit.  The specific error is displayed below the form input and the field is displayed with the Boostrap _has-error_ class.

Also, please note that only a few credit cards are 'accepted' by the hypothetical merchant in this demo.  The form contains enough fields to exercise all the validators, but would be considered incomplete in a production context.  For example, there is no input for a CVV number.  Please consider this as one possibility for modifying and enhancing the demo. 

The demo has been tested in late-model Chrome on a Mac. 


### Contributions

Contributions and coffee are highly encouraged as I believe the best demo is one that allows ample room for improvement. Regex, for example, is not my strong suit.  There is room for improvement in the valildators and someone may be interested in adding support for more credit cards that are accepted in the demo.  This will be delayed on my end until the 1.0 release of the Typescript Math Toolkit.

Submit pull requests to theAlgorithmist [at] gmail [dot] com.


License
----

Apache 2.0

**Free Software? Yeah, Homey plays that**

[//]: # (kudos http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[The Algorithmist]: <https://www.linkedin.com/in/jimarmstrong>
[statistical analysis of tabular data]: <https://github.com/theAlgorithmist/Table>
