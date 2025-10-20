# What are the specific tools for linting, testing, and building in the Python ecosystem?

For Python, the most common tools for linting are probably ruff, pylint and flake8. In the Python ecosystem, linters may also often be used alongside code formatting tools, such as black, as well as type checkers/analyzers, such as mypy, pyright and pytype.

Since Python is both a popular as well as a very well established ecosystem, there are a lot of testing tools available. The most common one may be pytest, but then there are also plenty of other popular ones, such as Robot, behave and unittest.

Python projects often do not need build tools, since there is usually no need for a build step, unless the project involves, for example, extensions that require it. For such situations or simply automating project-related stuff for CI/CD pipelines, tools like PyBuilder may be used.

# What alternatives are there to set up the CI besides Jenkins and GitHub Actions?

There are a lot of options for setting up a CI pipeline, such as GitLab, Bamboo, CircleCI, Travis CI, CodePipeline, TeamCity and Semaphore. In fact, the list is so long nowadays with each service having their own advantages, that it may be really difficult to compare and find the right one for each use case.

# Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?

I tried searching the internet for an answer to this, but – as one may expect – there is no straightforward answer. From the technical side, the Python ecosystem does not seem to pose any special considerations in terms of the environment, so the decision really comes down to other factors. From the business side of things, company policies and even budgets may affect the decision much more. Also, the skillsets and preferences of the developers may also play a part in making the decision.
