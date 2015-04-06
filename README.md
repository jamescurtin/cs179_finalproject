# cs179_finalproject
A Team Friday 10am


BEFORE BUILDING/CONTRIBUTING
---------
1. Install Dependencies
  1. Node.js (for LESS)
      1. 
        I recommend installing NVM, in case you have previous Node.js versions.
        More instructions can be found here https://github.com/creationix/nvm
        Afterwards run 
          ```
          nvm install vCURRENT_VERSION_HERE (i.e. v0.12.2)
          nvm alias default 0.12
          ```
      OR
      2.
        Download the latest nodejs version from http://nodejs.org
  2. After node is properly installed, run to install the less css pre-processor:
    `npm install -g less`
    
    from now on less compile can be run as lessc:
    `lessc styles.less > styles.css #creates a stylesheet from the .less files `
  
  3. Run Makefile to compile less when ready in either of the project folders. `make css`
    
