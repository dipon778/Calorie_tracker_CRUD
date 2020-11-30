// Storage Controller

//Item Controller

const ItemCtrl = (function(){
    const Item = function(id,name,calories){
        this.id =id;
        this.name=name;
        this.calories=calories;
    }

    //data Stractre
    const data = {
        items : [
            {id:0, name : 'Steak Dinner', calories : 1200},
            {id:1, name : 'Cookie', calories : 400},
            {id:2, name : 'Eggs', calories : 300} 
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
            calories =parseInt(calories);

            //Create new item
            newItem = new Item(ID,name,calories);
            data.items.push(newItem); 

            return newItem;
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
        itemCaloriesInput: '#item-calories'
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
            const newItem = ItemCtrl.addItem(input.name,input.calories);
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
            
            UICtrl.populateItemList(items);

            loadEventListners();
            
        }
    }

})(ItemCtrl, UICtrl);

App.init();