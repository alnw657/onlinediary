export class Story{
  title: string;
  note: string;
  created: number;
  color: any;
  constructor( title, note){
    this.title = title;
    this.note = note;
    this.created = new Date().getTime();
    this.color = this.randomColor();
    return this;
  }
  randomColor(){
    const h:number =  this.randomNumber(359);
    const s:string = '50';
    const l:string = '75';
    return `hsl(${h},${s}%,${l}%)`;
  }
  randomNumber(limit){
    return Math.round( Math.random() * limit );
  }
}
