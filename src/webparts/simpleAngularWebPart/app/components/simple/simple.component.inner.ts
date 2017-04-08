import { Injectable, Inject } from '@angular/core';
import { Component, Input } from '@angular/core';

@Injectable()
export default class SimpleComponentInner {
  @Input() public name: string;
  constructor() {
    console.log('*** SimpleComponentInner constructor ***');
  }
}