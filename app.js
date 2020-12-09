// Storage Controller

//Item Controller

const ItemCtrl = (function(){
    class Item {
        constructor(id, name, calories) {
            this.id = id;
            this.name = name;
            this.calories = calories;
        }
    }

    //data Stractre
    const data = {
        items : [
            
        ],
        curreItem : null,
        totalCalories : 0
    }
    return {
        getItems: function(){
            return data.items;
        },
        addItem:function(name,calories){
            //Create id
            let ID;
            if(data.items.length>0){
                ID=data.items[data.items.length-1].id + 1;
            } else {
                ID = 0;
            }

            //Calories to number
            calories = parseInt(calories);

            //Create new item
            newItem = new Item(ID,name,calories);
            data.items.push(newItem); 

            return newItem;
        },
        
        getTotalCalories : function(){

            let total=0;

            //loop through items 
            data.items.forEach(element => {
                total += element.calories;
            });

            //set total calorie in data structure
            data.totalCalories = total;
           console.log(total);

            return data.totalCalories;
        },
        logData: function(){
            return data;
        }
    }
})();

//UI Controller 
const UICtrl = (function(){
 
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }

    return{
        populateItemList: function(items){
            let html = '';
            items.forEach(item => {
                    html+=`<li class="collection-item" id="item-${item.id}">
                                <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                                <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                                </a>
                           </li>`;
            });
            // Insert List Items 
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput : function(){
            return {
                name : document.querySelector(UISelectors.itemNameInput).value,
                calories : document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item){

            //show the list 
            document.querySelector(UISelectors.itemList).style.display = 'block';
            //Create li Element
            const li = document.createElement('li');
            //add class
            li.className = 'collection-item';

            li.id = `item-${item.id}`;
            //Add html
            li.innerHTML = `
            <strong>${item.name}: </strong>
            <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
            </a>`;
            //Insert iTem
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li)
            
        },
        clearInput : function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';

        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).getElementsByClassName.display = 'none';
        },
        showTotalcalories : function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },
        getSelector: function(){
            return UISelectors;
        }
    }

})();


//App Controller
const App = (function(ItemCtrl, UICtrl){

    // Load event Listener 
    const loadEventListners = function(){
        //Get UI Selectors
        const UISelectors = UICtrl.getSelector();
        //Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);


    };

    const itemAddSubmit = function(e){
        //get form input from UIcontroller
        const input = UICtrl.getItemInput();

        if(input.name !== '' && input.calories !== ''){
            const newItem = ItemCtrl.addItem(input.name, input.calories);

            UICtrl.addListItem(newItem);
            
            //Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            UICtrl.showTotalcalories(totalCalories);

            //Clear fields
            UICtrl.clearInput();

        }
        
         console.log("add");
        e.preventDefault();
    }

    //public methods
    return {
        init: function(){
            console.log('initializing app ....');
            //Fetch Item from Item Controller
            const items = ItemCtrl.getItems();
            
            //check if any items
            if(items.length === 0)
            {
                UICtrl.hideList();
            } else {
                UICtrl.populateItemList(items);
            }           

            loadEventListners();
            
        }
    }

})(ItemCtrl, UICtrl);

App.init();