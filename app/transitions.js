export default function() {
  this.transition(
    this.fromRoute('purchases/success'),
    this.toRoute('dashboard'),
    this.use('fade', {duration : 1200})
  );
}