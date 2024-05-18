# Contributing to QuizOnTwitch

First off, thank you for considering contributing to QuizOnTwitch! Your help is essential for making the project better for everyone.

## How to Contribute

### Reporting Bugs

If you find a bug in the source code, you can help by submitting an issue to our [GitHub Issue Tracker](https://github.com/ilostmymedic/QuizOnTwitch/issues). Please include the following:

- A clear and descriptive title
- A detailed description of the problem
- Steps to reproduce the issue
- Any relevant logs or screenshots

### Suggesting Enhancements

We welcome suggestions for improvements! If you have an idea, please submit it to our [GitHub Issue Tracker](https://github.com/ilostmymedic/QuizOnTwitch/issues) with the following:

> **NOTE:** Please use the correct templates provided when opening a new issue.


- A clear and descriptive title
- A detailed description of your idea
- Why you believe this enhancement would be useful


### Contributing Code

#### Getting Started

1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine:

   ```sh
   git clone https://github.com/ilostmymedic/QuizOnTwitch.git
   ```
3. Navigate to the project directory:
   
   ```sh
   cd QuizOnTwitch
   ```
4. Create a new branch for your feature or bugfix:
   
   ```sh
   git checkout -b my-feature-branch
   ```

#### Making Changes
Ensure your changes follow the project's coding standards and conventions.

Write clear, concise commit messages.

If you've added code that should be tested, add tests.

Ensure that the test suite passes:

```sh
npm test
```

#### Keeping Your Fork Updated
1. Fetch the latest changes from the main repository:
2. 
   ```sh
   git fetch upstream
   ```
3. Merge the latest changes into your branch:
4. 
   ```sh
   git rebase upstream/main
   ```
5. Resolve any conflicts if they arise.

#### Submitting Your Changes
1. Push your changes to your forked repository:
2. 
   ```sh
   git push origin my-feature-branch
   ```
3. Open a pull request to the main repository.
4. In the pull request description, include a detailed explanation of your changes and why they are necessary.


### Contributing to translation
We do not accept any translation changes in commits on Github.
All translation contributions are managed through [Crowdin](https://crowdin.com/project/quizontwitch), and later merged by administrators.

### Resources
* [Github Wiki](https://github.com/ILostMyMedic/QuizOnTwitch/wiki)

Thank you for contributing to QuizOnTwitch! 💜
