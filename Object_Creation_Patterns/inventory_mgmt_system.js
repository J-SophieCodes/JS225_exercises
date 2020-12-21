class Item {
  constructor(itemName, category, quantity) {
    this.itemName = itemName;
    this.category = category;
    this.quantity = quantity;
    this.sku = this.generateSkuCode();
  }

  generateSkuCode() {
    if (this.isValid()) {
      let code = this.itemName.replace(/ /g, '').slice(0, 3) + this.category.slice(0, 2);
      return code.toUpperCase();
    }
  }

  hasValidName() {
    return this.itemName.match(/[^ ]/g).length >= 5;
  }

  hasValidCategory() {
    return !this.category.includes(' ') && this.category.match(/[^ ]/g).length >= 5;
  }

  hasValidQuantity() {
    return this.quantity >= 0;
  }

  isValid() {
    return this.hasValidName() &&
      this.hasValidCategory() &&
      this.hasValidQuantity();
  }
}

const ItemManager = {
  items: [],

  create(itemName, category, quantity) {
    let item = new Item(itemName, category, quantity);
    if (item.isValid()) {
      this.items.push(item);
    } else {
      return false;
    }
  },

  update(skuCode, obj) {
    let item = this.findItem(skuCode);
    Object.keys(obj).forEach(key => item[key] = obj[key]);
  },

  delete(skuCode) {
    let idx = this.items.indexOf(this.findItem(skuCode));
    return this.items.splice(idx, 1);
  },

  inStock() {
    let selected = this.items.filter(({quantity}) => quantity > 0);
    return selected;
  },

  itemsInCategory(category) {
    let selected = this.items.filter(item => item.category === category);
    return selected;
  },

  findItem(skuCode) {
    return this.items.filter(item => item.sku === skuCode)[0];
  }
};

const ReportManager = {
  init(itemMgr) {
    this.items = itemMgr;
  },

  createReporter(skuCode) {
    let item = this.items.findItem(skuCode);
    return {
      itemInfo() {
        Object.keys(item).forEach(key => {
          console.log(`${key}: ${item[key]}`);
        });
      },
    };
  },

  reportInStock() {
    console.log(this.items.inStock().map(({itemName}) => itemName).join(', '));
  }
};



ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item

console.log(ItemManager.items);
// returns list with the 4 valid items

ReportManager.init(ItemManager);
ReportManager.reportInStock();
// // logs soccer ball,football,kitchen pot

ItemManager.update('SOCSP', { quantity: 0 });
console.log(ItemManager.inStock());
// returns list with the item objects for football and kitchen pot
ReportManager.reportInStock();
// logs football,kitchen pot
console.log(ItemManager.itemsInCategory('sports'));
// returns list with the item objects for basket ball, soccer ball, and football
ItemManager.delete('SOCSP');
console.log(ItemManager.items);
// returns list with the remaining 3 valid items (soccer ball is removed from the list)

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10