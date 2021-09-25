
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

          // CREATE A NEW ID
          if(data.allitems[type].length > 0)
          {
            ID = data.allitems[type][data.allitems[type].length-1].id + 1;
          }
          else
          {
            ID=0;
          }

          // CREATE A NEW ITEM BASED ON TYPE
          if (type==='inc')
          {
            newItem =new Income(ID,description,value);
            data.allitems.inc.push(newItem);
            // console.log(data.allitems[type]);
          }
          else if (type==='exp')
          {
            newItem =new Expense(ID,description,value);
            data.allitems.exp.push(newItem);
            // console.log(data.allitems[type]);
          }


          // console.log(newItem);
          // console.log(data.allitems[type]);



          return newItem;
        },

        // Testing purpose
        testing:function()
        {
          console.log(this.data)
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

      addListItem:function(obj, type)
      {
        var html, newHtml, element;
        // Create HTML string with text placeholder
        if(type==='inc')
        {
          element= DOMStrings.incomeContainer;
          html= '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
        else if(type==='exp')
        {
          element= DOMStrings.expensesContainer;
          html='<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }

        //Place the text placeholder with  actual data
        newHtml=html.replace('%id%',obj.id);
        newHtml=newHtml.replace('%description%', obj.description);
        newHtml=newHtml.replace('%value%', obj.value);

        //Insert the HTML into DOM
        document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
      },

      clearFields: function()
      {
        var fields, fieldsArr;
        //To clear multiple fields
        fields= document.querySelectorAll(DOMStrings.inputDescription+','+DOMStrings.inputValue);
        fieldsArr=Array.prototype.slice.call(fields);

        fieldsArr.forEach( function(current,index,array)
        {
            current.value="";
        });

          //Focus back to description input
          fieldsArr[0].focus();
      },

      //To get domStrings object
      getDOMstrings:function()
      {
            return DOMStrings;
      },
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
            // console.log(input);

            // 2: Add item to budget controller
            newItem =budgetCtrl.addItem(input.type, input.description,input.value);
            // console.log(newItem);
            // budgetCtrl.testing();

            // 3: Add the item to the UI
            UICtrl.addListItem(newItem,input.type);  

            //4: clear the fields
            UICtrl.clearFields();

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