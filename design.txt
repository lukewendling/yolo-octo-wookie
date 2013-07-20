Dispatcher
  array log
  elevatorbank bank

  initialize
    bank = ElevatorBank.new
  
  bank.on('requestComplete')
    complete req

  on('request')
    log req
    forward req

  fx log req
    log.push req

  fx forward req
    bank.forward req

  fx complete req
    log.find(req).complete = true

ElevatorBank
  array elevators
  array requests

  initialize
    elevators = [el1, el2]
    elevators.each
      elevator.on('done')
        emit 'requestComplete', req
    start

  fx start
    while
      elevators.each
        if !elevator.busy?
          elevator.forward next

  fx forward req
    requests.push req

  fx next
    requests.pop

Elevator
  array queue

  fx forward req
    if busy?
      queue req
    else
      accept req

  fx queue req
    queue.push req

  fx accept req
    moveto req

  fx moveto req
    busy = true
    sleep 1 // emulate work
    busy = false
    emit 'done', req

  fx busy?
    busy

  on('done')
    next

  fx next
    if queue.empty?
      wait
    else
      accept queue.pop