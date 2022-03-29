# P00LS Takehome
Thank you for applying to P00LS. We respect your time, and thus don't expect you to spend more than TWO (2) hours on this exercise. At the 2 hour mark, stop your work, note down what else you would have done given more time.

## Autocomplete Exercise
In this repo, you will find a simple implementation of an Autocomplete combobox dropdown. Currently, it statically imports a JSON array of countries that serves as the data for the autocomplete.

Your main task is to refactor the component so that it is able to support fetching data from a remote location. In `public/index.html`, you will find and instance of this Autocomplete component that suggests country names based on the user's input. Below that is a commented-out example for suggesting users.

You may use data from https://reqres.in/api/users, though feel free to use any other publically available API and to create any number of autocompletes for different types of data.

As you complete this exercise, note any decisions and trade offs that you make in `NOTES.md`. At the end of 2 hours, add to the file what else you would have (re)done given more time.

## Running the code
Run `yarn start` in a terminal to have parcel set up a server that autoreloads as you make changes. You're not expected to know how parcel works, but freel free to modify the configs if you wish.

## Things to consider
- There is no one correct way of completing this task--whatever choices you make, document your reasoning for doing so.
- You can assume that, like the provided `index.html` file, there might be multiple autocomplete instances on a page.
- Feel free to use what is provided, or completely rewrite parts (or all) of it.
- You may not use any JS frameworks (React, Vue, Svelte, etc.), but you may install any utility libraries you require.
- Use git to keep track of your work. Pretend as if you were creating a pull request that will be merged in via a Merge commit.

## If you have extra time
If you complete the main task of this exercise prior to the 2 hour mark, you may embark on a bonus task to improve the UX of the autocomplete component. This could take the form of any of the following:
 [ ] Keyboard navigation
 [ ] Custom option rendering
 [ ] Stylistic changes
 [ ] Better matching on static data
 [ ] Animations
 [ ] Any of your own choosing.
In any case, do not exceed the 2 hours.
