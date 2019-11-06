
# Overview
This Vue.js application is a library built to house all of the marketing department's forms, tools, features (i.e. event calendar, ticket download), etc. Although this application has mainly been used within Instapage, it should be compatible within static environments as well.

## Installation
#### Download
	git clone git@bitbucket.org:responsewebdev/marketing-library.git
	cd marketing-library
	npm install

#### Running
	npm run dev

#### Build
	 npm run build

# Applications
### Inline Product Payment Form

### Select Product First Form

# Individual Components
### Block Input
This component is a "block" styled input for form assembly. The value being mutated must live within the Vuex store, otherwise the component will not work. To use, simply pass down props and validations for a functioning input.

**Props**
 - id - Input Id for Input, this also maps the location of the value being mutated in state
 - label - Input label (i.e. First Name)
 - type - specify the type of input (does not work for select inputs)
 - v - Validation specifications from [Vuelidate](https://monterail.github.io/vuelidate/#sub-package-content)
 - mask - Input formatting from [Vue Mask](https://www.npmjs.com/package/v-mask)

### Select Input
This component is a "block" styled select input for form assembly. The value being mutated must live within the Vuex store, otherwise the component will not work. To use, simply pass down props and validations for a functioning dropdown.
**Props**
 - id - Input Id for Input, this also maps the location of the value being mutated in state
 - label - Input label (i.e. First Name)
 - options - array of dropdown options (*must be object array structured as* [{ value: *option value*, text: *option text* }] )
 - v - Validation specifications from [Vuelidate](https://monterail.github.io/vuelidate/#sub-package-content)
