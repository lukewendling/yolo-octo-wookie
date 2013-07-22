An Elevator Programming Exercise
================================

I set out to write a program to handle elevator requests - inspired by the seemingly sluggish elevators in my 4 story apartment complex.

Usage
-----
The program provides rudimentary console output to review elevator activity. Start the server in one process (terminal) and then execute client requests:

```
# terminal 1 (review request log here)
node server

# terminal 2
node client
```

Objectives
----------
* Responsive: each elevator in a bank should respond quickly to new requests
* Use an event-based program design
* Simple design: simpler is better

Lessons Learned
---------------
Elevator programming is not trivial. I initially planned to build an optimization strategy and/or routing algorithm but the basics of queueing proved to be challenging enough. Here's an example of a more sophisticated scenario:

If your aim is for high throughput, you might be tempted to respond very quickly to the next closest request. For example, if the elevator is currently on floor 10, and 2 simultaneous requests come in, floor 1 and floor 12, you'll likely take the latter. In high-volume scenarios where most activity is between floors 10-15 (maybe lunch time in a large office building), when does floor 1 get serviced?

In fact, just dealing with directionality at all is quite challenging. Managing the current state (floor num) and directionality (up/down) for all elevators, and pairing with incoming requests, in addition to queuing is a multi-faceted problem.