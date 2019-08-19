<html>
  <body>
    <script>
      class MyButton {
          constructor(text) {
              this.text = text
          }
      
          onClick(callback) {
            alert(`You pressed the button ${this.text}`)
            callback()
          }
      
          render(parent) {
            const button = document.createElement('button')
            button.append(this.text)
            button.onclick = this.onClick
      
            parent.append(button)
          }
      }
      
      
      const myButton = new MyButton('HOLA')
      
      document.render(document.body)
    </script>
  </body>
</html>