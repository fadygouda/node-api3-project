const express = require('express');

const Users = require('./userDb.js')
const Posts = require('../posts/postDb.js');
const router = express.Router();


router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({message: 'Something went wrong when posting, server error', err});
    }) 
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  const postInfo = { ...req.body, user_id: req.params.id}
  Posts.insert(postInfo)
    .then(post=> {
      res.status(200).json(post)
    })
    .catch(err => {
      res.status(500).json({errormessage: "Something went wrong adding your post!"})
    })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({errormessage: 'Something went wrong', err})
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id
  Posts.getById(id)
    .then(post => {
      res.status(200).json(post)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({errormessage: 'Something went wrong while retrieving post'})
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id
  Users.remove(id)
    .then(count => {
      if(count > 0) {
        res.status(200).json({ message: "User has been deleted"})
      } else {
        res.status(404).json({ errorMessage: 'User was not found'})
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong while deleting the user!', err})
    })
});

router.put('/:id', validateUser, validateUserId, (req, res) => {
  // do your magic!
  Users.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({message: 'User was not updated'})
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Something went wrong while updating the user!'})
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const {id} = req.params;
  Users.getById(id)
    .then(user => {
      if(user) {
        req.user = user;
        next();
      } else {
        next({message: 'User not found'})
      }
    });
};

function validateUser(req, res, next) {
  // do your magic!
  if(req.body && Object.keys(req.body).length > 0 ) {
    next();
  } else {
    res.status(400).json({message: 'Needs a user'})
  };
};

function validatePost(req, res, next) {
  // do your magic!
  if(req.body.text) {
    next();
  } else {
    res.status(400).json({message: 'Missing Text'})
  }
}

module.exports = router;
