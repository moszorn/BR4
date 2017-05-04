import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.css']
})
export class NavTopComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    /* BR無右上側漢保選單，可暫時不使用*/
    /*var $leftdp;
    var $rgdp;
    var $nav_btn;
    var $rep_btn;

    $(document).on('click', '#nav_leftbtn', function () {
      $leftdp = $('#navbarNavDropdown').css('display');
      $nav_btn =$('#nav_rgtbtn');
      $rep_btn= $('#nav_leftbtn');
      if ($leftdp == 'block') {
        //$('#navbarNavDropdown').toggle();
        //$('#nav_rgtbtn').click();
        $nav_btn.click();
        console.log($nav_btn);
      } else { }
    });
    $(document).on('click', '#nav_rgtbtn', function () {
      $rgdp = $('#reportNavDropdown').css('display');
      // alert('rg click=' + typeof($rgdp));
      if ($rgdp == 'block') {
        console.log($rep_btn) ;
        //$('#nav_leftbtn').click();
        $rep_btn.click();
        //$('#reportNavDropdown').toggle();
      } else { }
    });*/
  }

}
