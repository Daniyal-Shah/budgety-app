console.log("Application ");

//Budget Controller
var budgetController=(function()
{
  var Expense= function(id, description, value)
  {
    this.id=id;
    this.description=description;
    this.value=value;
  };

  var Income= function(id, description, value)
  {
    this.id=id;
    this.description=description;
    this.value=value;
  };

  var data=
  {
    allitems:{
      exp:[],
      inc:[]
    },
    totals:{
      exp:0,
      inc:0
    }
  };

  return{
        addItem:function(type,description,value)
        {
          var newItem,ID;
          ID=0;

          // CREATE A NEW ID
          if(data.allitems[type].length-1 > 0)
          {
            ID = data.allitems[type][data.allitems[type].length-1].id + 1;
          }
          else
          {
            ID=0;
          }


          // CREATE A NEW ITEM BASED ON TYPE
          if (newIte==="inc")
          {
            newItem =new Income(ID,description,value);
          }
          else if (newIte==="exp")
          {
            newItem =new Expense(ID,description,value);

          }
          this.data.allitems[type].push(newItem);
          return newItem;
        },

        // Testing purpose
        testing= function()
        {
          console.log(data)
        }
  };


})();

//UIController
/// UI CONTROLLER

var UIController = (function () {


    var DOMStrings = {
      inputType: ".add__type",
      inputDescription: ".add__description",
      inputValue: ".add__value",
      inputBtn: ".add__btn",
      incomeContainer: ".income__list",
      expensesContainer: ".expenses__list",
      budgetLabel: ".budget__value",
      incomeLabel: ".budget__income--value",
      expensesLabel: ".budget__expenses--value",
      percentageLabel: ".budget__expenses--percentage",
      container: ".container",
      expensesPercLabel: ".item__percentage",
      dateLabel: ".budget__title--month"
    };
    
    return {

        // to get input values
      getInput: function () {
  
        return {
          type: document.querySelector(DOMStrings.inputType).value, //Will either be inc (income +) or exp (expens -)
          description: document.querySelector(DOMStrings.inputDescription).value,
          value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
        };
      },
    //   to get domStrings object
     
      getDOMstrings:function()
      {
            return DOMStrings;
      }

    };
  
  })();
  
  

//Global App controller
var Controller=(function(budgetCtrl,UICtrl)
{
    var setupEventListeners= function()
    {
        var DOM= UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', function()
        {
            //Call the method for adding item
            ctrlAddItem();
        });
    
        //Event for pressing enter key to add record
        document.addEventListener('keypress', function(event)
        {
            if(event.keyCode===13 ||event.which===13)
            {
            //Call the method for adding item
            ctrlAddItem();
            }
        });
    };



    var ctrlAddItem = function()
    {
            var input, newItem;

            // 1: Get field input
            input = UICtrl.getInput();
            console.log(input);

            // 2: Add item to budget controller
            newItem =budgetCtrl.addItem(input.type, input.description,input.value);
            budgetCtrl.testing();
            // 3: Add the item to the UI

            // 4: Calculate the budget

            // 5: Display the budget on the UI

    };
    return{
            init:function()
            {
                console.log("Application Started");

                setupEventListeners();
            }
    };
})(budgetController,UIController);


Controller.init();