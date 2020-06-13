import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  //declarar un vector de la clase dish con datos quemados
  dishes: Dish[];

  selectedDish: Dish;

  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.dishes = this.dishService.getDishes();
  }

}