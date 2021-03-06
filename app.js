
//Budget Controller
var budgetController=(function()
{
  var Expense= function(id, description, value)
  {
    this.id=id;
    this.description=description;
    this.value=value;
    this.percentage=-1;
  };

  Expense.prototype.calcPercentage= function(totalIncome)
  {
    if(totalIncome>0)
    {
      this.percentage= Math.round((this.value/totalIncome)*100);
    }
    else
    {
      this.percentage=-1;
    }
  }

  Expense.prototype.getPercentage=function()
  {
    return this.percentage;
  }

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
    },
    budget:0,
    percentage:-1
  };

  var calculateTotal= function(type)
  {
    let sum=0;
    data.allitems[type].forEach(function(cur)
    {
        sum= sum+cur.value;
    });
    data.totals[type]=sum;
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

        deleteItem: function(type,id)
        {
          var ids, index;
          ids= data.allitems[type].map(function(current)
          {
              return current.id;
          });

          index= ids.indexOf(id);

          if( index !== -1)
          {
            data.allitems[type].splice(index,1);
          }

        },

        calculateBudget: function()
        {
          // calculate total income and expense
          calculateTotal('inc');
          calculateTotal('exp');

          // calculat the income - expense
          data.budget= data.totals.inc - data.totals.exp;

          // calculate the percentage of income that we used
          if(data.totals.inc>0)
          {
            data.percentage = Math.round((data.totals.exp/data.totals.inc)*100);
          }
          else
          {
            data.percentage=-1;
          }
        },

        calculatePecentages:function()
        {
          data.allitems.exp.forEach(function(current)
          {
              current.calcPercentage(data.totals.inc);
          });
        },

        getPercentages:function()
        {
          var allPerc= data.allitems.exp.map(function(cur)
          {
            return cur.getPercentage();
          });
          return allPerc;
        },
        // Testing purpose
        testing:function()
        {
          // this.data.addItem['exp']
          console.log(data.allitems);
        },

        getBudget:function()
        {
          return{
            budget:data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage
          }
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
          html= '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">+ %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }
        else if(type==='exp')
        {
          element= DOMStrings.expensesContainer;
          html='<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">- %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }

        //Place the text placeholder with  actual data
        newHtml=html.replace('%id%',obj.id);
        newHtml=newHtml.replace('%description%', obj.description);
        newHtml=newHtml.replace('%value%', obj.value);

        //Insert the HTML into DOM
        document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
      },
      deleteListItem: function(selectorID)
      {
        var el=document.getElementById(selectorID);
        el.parentNode.removeChild(el);
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

      displayBudget: function(obj)
      {
          document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;              
          document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;              
          document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExp;              
          
          if (obj.percentage>0)
          {
            document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage+" %";  
          }
          else
          {
            document.querySelector(DOMStrings.percentageLabel).textContent = "---";              
          }
      },

      displayPercentages: function(percentages)
      {
        var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);

        var nodeListForEach = function(list, callback)
        {
          for(var i=0; i< list.length;i++)
          {
            callback(list[i],i);
          }
        };

        nodeListForEach(fields, function(current, index)
        {
          if(percentages[index]>0)
          {
            current.textContent= percentages[index]+'%';
          }
          else
          {
            current.textContent='---';
          }

        });
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

        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
    };

    var updateBudget=function()
    {
      // 1: Calculate the budget
      budgetCtrl.calculateBudget();

      // 2: Return budget
      var budget = budgetCtrl.getBudget();
      console.log(budget);

      // 3: Display the budget on the UI
      UICtrl.displayBudget(budget);
    };
    var updatePercentages=function()
    {
      //calculate the percentage
      budgetCtrl.calculatePecentages();

      // read percentages from the budget controller
      var percentages= budgetCtrl.getPercentages();

      // update the UI with new percentages
      budgetCtrl.displayPercentages(percentages);
      console.log(percentages);
    };
    var ctrlAddItem = function()
    {
            var input, newItem;

            // 1: Get field input
            input = UICtrl.getInput();
            // console.log(input);

            if(input.description!=="" && !isNaN(input.value) && input.value>0)
            {
              // 2: Add item to budget controller
              newItem =budgetCtrl.addItem(input.type, input.description,input.value);
              // console.log(newItem);
              // budgetCtrl.testing();

              // 3: Add the item to the UI
              UICtrl.addListItem(newItem,input.type);  

              //4: Clear the fields
              UICtrl.clearFields();

              //5: Calculate Update budget
              updateBudget();

              //6: calculate and update percentages
              updatePercentages();
            }

    };

    var ctrlDeleteItem = function(event)
    {
      var itemID, splitID, type, ID;
      itemID=event.target.parentNode.parentNode.parentNode.parentNode.id;
      console.log(itemID);
      if(itemID)
      {
        splitID= itemID.split('-');
        type=splitID[0];
        ID=parseInt(splitID[1]);


        // 1:Delete the item from the data structure
        budgetCtrl.deleteItem(type,ID);
        
        // 2:Delete the item from UI
        UICtrl.deleteListItem(itemID);

        // 3:Update the new budget
        updateBudget();

        //6: calculate and update percentages
        updatePercentages();
      }

    }

    return{
            init:function()
            {
                console.log("Application Started");
                UICtrl.displayBudget(                  
                  {
                    budget:0,
                    totalInc: 0,
                    totalExp: 0,
                    percentage: -1
                  }
                );
                setupEventListeners();
            }
    };
})(budgetController,UIController);

Controller.init();