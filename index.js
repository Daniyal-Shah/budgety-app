//Budget Controller
var budgetController=(function()
{

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
    var DOM= UICtrl.getDOMstrings();
    var ctrlAddItem = function()
    {
            // 1: Get field input
            var input = UICtrl.getInput();
            console.log(input);

            // 2: Add item to budget controller

            // 3: Add the item to the UI

            // 4: Calculate the budget

            // 5: Display the budget on the UI

    }

    document.querySelector(DOM.inputBtn).addEventListener('click', function()
    {
        //Call the method for adding item
        ctrlAddItem();
    });

    //Event for pressing enter key to add record
    document.addEventListener('keypress', function(event){
        if(event.keyCode===13 ||event.which===13)
        {
        //Call the method for adding item
        ctrlAddItem();
        }
    });

})(budgetController,UIController);