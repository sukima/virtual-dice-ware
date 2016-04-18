export default function() {
  this.transition(
    this.fromRoute('index'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.toRoute('words'),
    this.fromRoute('entropy'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('about'),
    this.use('toRight'),
    this.reverse('toLeft')
  );
}
