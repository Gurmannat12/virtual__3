class Food {
    constructor(){
        this.image = loadImage("Milk.png");
        this.foodStock=0;
        this.lastFed;
    }

    getFoodStock(){
        return this.foodStock;

    }

    getFedTime(lastFed){
        this.lastFed = lastFed;

    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;

    }

    deductFood(){
        if(this.foodS>0){
        this.foodS = this.foodS - 1;
        }
    }

    display(){
        var x=80,y=100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }

    bedroom(){
        background(bedroom_img,550,500);
        dog.changeImage("sleeping",sleeping_img);
    }

    garden(){
        background(garden_img,550,500);
        dog.changeImage("running",running.png);
    }

    washroom(){
        background(washroom_img,550,500);
    }
}