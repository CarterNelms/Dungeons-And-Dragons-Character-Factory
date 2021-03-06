import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { DropdownComponent } from '../../common/dropdown.component';

import { ClassesService } from './classes.service';
import { SkillsService } from '../skills/skills.service';
 
import { ObjToArrPipe } from '../../common/obj_to_arr.pipe';

@Component({
  selector: 'class-choose',
  templateUrl: '/partials/characters/classes/choose',
  directives: [ROUTER_DIRECTIVES, DropdownComponent],
  providers: [ClassesService],
  pipes: [ObjToArrPipe]
})

export class ClassChooseComponent {
  public class_id;

  constructor(private service: ClassesService, private skills_service: SkillsService) { }

  ngOnInit() {
    this.class_id = null;

    this.service.getClasses(classes => {
      this.setRandomClass();
    });
  }

  setRandomClass () {
    this.class = _.sample(this.classes);
  }

  set class (clss) {
    this.class_id = _.isEmpty(clss) ? null : clss._id;
    clss = this.class;
    let traits = clss.traits ? clss.traits : [];
    this.skills_service.setAllowedProficienciesFromTraits('class', traits);
  }

  get class () {
    if (!this.class_id) {
      return {};
    }

    return this.classes[this.class_id];
  }

  get classes () {
    return this.service.classes;
  }
}
