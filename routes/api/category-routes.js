const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include:[Product]
    })
    res.status(200).json(categories)
  } catch (err) {
      res.status(500).json({
        msg:"hmm there seems to be an error internally.",
        err
      })
  }
});

router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id).then(category=>{
    if(!category){
      return res.status(404).json({
        msg: "This category does not exist bozo."
      })
    }
    res.json(category)
  }).catch(err=>{
      res.status(500).json({
        msg:"hmm there seems to be an error internally.",
        err
      })
  })
});

router.post('/', async (req, res) => {
  try{
    const newCategory = await Category.create({
      category_name:req.body.category_name,
    })
    res.status(201).json(newCategory)
  }catch(err){
    console.log(err)
    res.status(500).json({
      msg:"Server Error", err
    })
  }
});

router.put('/:id', (req, res) => {
  Category.update({
    category_name:req.body.category_name
  },
    {
      where:{
        id:req.params.id
      }
    }).then(category=>{
      if(!category[0]){
        return res.status(404).json({
          msg:"that category doesn't exist."
        })
      }
      res.json(category)
    }).catch(err=>{
      res.status(500).json({
        msg:"hmm there seems to be an error internally.",
        err
      })
    })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where:{
      id:req.params.id
    }
  }).then(category=>{
    if(!category){
      return res.status(404).json({
        msg:"that category doesn't exist"
      })
    }
    res.json(category)
  }).catch(err=>{
    res.status(500).json({
      msg:"hmm there seems to be an error internally.",err
    })
  })
});

module.exports = router;
