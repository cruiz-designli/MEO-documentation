---
sidebar_position: 2
---

# Event Propagation

MEO uses an event system that allows different parts of the application to communicate with each other. This system is based on the [Mediator Pattern](https://en.wikipedia.org/wiki/Mediator_pattern) and is implemented using the [NestJS Event Emitters](https://docs.nestjs.com/techniques/events).

This pattern allows the application to handle long running background processes without blocking the main thread. It also allows the application to be more modular and easier to test. The event system is used to propagate changes in the model, like when a node is updated, or when a report is generated.

- **Rollup and Rolldown events**: These events are used to update the rollup and rolldown data (revenue or percentages) from a node to its dependencies.
- **Report events**: These events are used to generate reports for the clients. Like the BCP hub PDF report.
- **Calculated fields events**: Are required since the model has calculated fields that depend on the node's children.
- **Mitigation recalculations**: These events are required since many times the mitigation values need to be recalculated when a dependency or financial value changes.