# Ackee Cookbook Next
## So what did I add?
### **1)** Added the option to add food images to recipes
Images are uploaded to Imgur using 3rd party API; **MongoDB** then stores only the image ID

*(Upload requires **Imgur API token** stored in the enviroment variable ```IMGUR_TOKEN```)*
- Create a new recipe

  ```POST https://localhost:3000/api/v1/recipes```

  ```js
  {
    "name": "Ackee Lorem Ipsum",
    "foodPic": imageDataInBase64
  }
  ```

- Update existing recipe

  ```PUT https://localhost:3000/api/v1/recipes/:recipeId```
  ```js
  {
    "name": "Ackee Lorem Ipsum",
    "foodPic": imageDataInBase64
  }
  ```
### **2)** Added the option to purge all recipes
- Purge all the recipes

  ```DELETE https://localhost:3000/api/v1/recipes```

### **3)** Create custom recipe lists
- Get all the recipes in the list

  ```GET https://localhost:3000/api/v1/list/:listName```

- Create list or add recipe

  ```POST https://localhost:3000/api/v1/list/:listName```  
  ```js
  {
    "recipe": recipeId
  }
  ```
  When the list with the given ```listName``` already exists, it is updated with the new recipe. Otherwise, a new list with the given name is created.

- Remove a list

  ```DELETE https://localhost:3000/api/v1/list/:listName```

- Remove item from a list

  ```DELETE https://localhost:3000/api/v1/list/:listName/:recipeId```

  *(If there is no recipe left in the list after the deletion, the whole list is removed)*

### **4)** Added discussions for the recipes
- Get all the comments

  ```GET https://localhost:3000/api/v1/recipes/:recipeId/discussion```

- Add a new comment

  ```POST https://localhost:3000/api/v1/recipes/:recipeId/discussion```
  ```js
  {
    "nick": "Mr. Placeholder",
    "comment": "This recipe is really dope yo!"
  }
  ```

- Remove a comment from the discussion

  ```DELETE https://localhost:3000/api/v1/recipes/:recipeId/discussion/:commentId```

  *(```commentId``` is the index of the comment in an array)*