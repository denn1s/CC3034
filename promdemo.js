// su mama les prometió comprarles un nuevo teléfono

const momIsHappy = false

const willGetNewPhone = new Promise(
  function(resolve, reject) {
    if (momIsHappy) {
      resolve({
        model: 'huawei',
        color: 'black'
      })
    } else {
      const reason = new Error("Mom is not happy")
      reject(reason)
    }
  }
)

function askMom() {
  willGetNewPhone
    .then(phone => {
      console.log('Got new phone!', phone)
      return phone
    })
    .then(showOff)
    .then(message => {
      console.log('Hey sis', message)
    })
    .catch(reason => {
      console.log('didnt get a phone because', reason)
    })
}


const showOff = function(phone) {
  return new Promise(
    function(resolve, reject) {
      resolve(`I got my new ${phone.color} ${phone.model}!`)
    }
  )
}


askMom()

// (![] + [])[+[]] + (![] + [])[+!+[]] + ([![]] + [][[]])[+!+[] + [+[]]] + (![] + [])[!+[] + !+[]]
