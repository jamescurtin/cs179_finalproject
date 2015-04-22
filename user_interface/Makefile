DEBUG = True

# path to less compiler
lessc = ./../node_modules/.bin/lessc

# DEBUG options
ifeq ($(DEBUG),True)
	LESSC=$(lessc)
else
	LESSC=$(lessc -x)
endif

# when you run `make` alone, run the `css` rule (at the
# bottom of this makefile)
all: css

# .PHONY is a special command, that allows you not to
# require physical files as the target (allowing us to
# use the `all` rule as the default target).
.PHONY: all

# replace all .less files with .css extension and cache
# the results in a variable called `css_files`
LESS_FILES = less/freelancer.less
# # Our CSS file names list, replace .less with .css, and folder names
CSS_FILES:=$(LESS_FILES:less/%.less=css/%.css)

# when a .css file is *not* up to date compared to the
# .less file, then make will run the the following commands:
# - echo the string "foo.less -> foo.css"
# - run the command `lessc -x --source-map foo.less foo.css`
./css/%.css: less/%.less
	@echo "$< -> $@"
	$(LESSC) -x --source-map $< $@

css: $(CSS_FILES)

clean:
	rm -f $(CSS_FILES)