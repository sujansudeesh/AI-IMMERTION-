# 03 — Human-centred problem definition

**Status: provisional; not yet grounded in supplied participant records.**

## Problem statement

Store staff and customers need an understandable way to complete retail purchases and check availability and order progress. The project will investigate whether information gaps and repeated manual steps create avoidable effort or uncertainty in the present workflow.

## How Might We

> How might we help customers and staff at Sri Chamundi Stores complete purchases with less waiting and less uncertainty about product availability and order progress?

This question is intentionally wider than “build an ERP.” It leaves room for non-software, assisted and smaller digital interventions.


## Person → situation → difficulty → consequence → desired improvement

The following framing is provisional, not a record of observed events.

| Person | Situation to investigate | Potential difficulty | Potential consequence | Desired improvement to test |
|---|---|---|---|---|
| Cashier | Completing a counter purchase. | Repeated item/price lookup or an unclear correction flow. | Extra effort, hesitation or incorrect entries. | An understandable way to complete and correct a bill. |
| Owner/manager | Checking availability or deciding what to restock. | Records may require reconciliation. | Uncertainty when making a stock decision. | Clear, actionable information without unnecessary repeated entry. |
| Customer | Selecting products and following up on an order. | Availability or the next step may be unclear. | Extra calls, waiting or an avoidable trip. | Understandable availability and order progress. |

Research can reject or change these hypotheses. A database implementation is a possible means, not the human problem itself.

## Provisional points of view

| Role | Potential need | Insight to investigate, not a confirmed finding |
|---|---|---|
| Owner/manager | A clear overview of stock and transactions. | More detail may be less useful than a small number of actionable signals. |
| Cashier | An accurate sale with understandable recovery from mistakes. | Fewer steps may help, but speed must not obscure error prevention. |
| Customer | Clear availability and the next action for an order. | A simple status may be more understandable than an elaborate tracker. |

No invented names or demographic details are used. Replace general role assumptions with evidence-coded findings once research is complete.

## Draft user stories and acceptance criteria

These are proposed requirements, not passed tests.

| ID | User story | Observable acceptance criterion | Research link |
|---|---|---|---|
| US-01 | As a cashier, I want to find an item and correct its quantity so that the bill reflects the purchase. | In a demo dataset, the cashier finds the intended item, changes quantity and identifies the total without unrecorded moderator help. | Pending. |
| US-02 | As an owner, I want to identify stock needing attention so that I can choose a restocking action. | The owner identifies a preconfigured low-stock product and explains the displayed stock state. | Pending. |
| US-03 | As a customer, I want clear availability before checkout so that I can decide whether to proceed. | Available/unavailable states are understandable; the server rejects quantities exceeding current stock. | Pending. |
| US-04 | As a customer, I want to find the state of my order so that I know the next step. | The customer locates their own demo order and explains its current status; another customer's order is inaccessible. | Pending. |
| US-05 | As a manager, I want a traceable stock adjustment so that a correction can be understood later. | A permitted adjustment records who, what, when and why; an unauthorized role cannot perform it. | Pending. |

## Definition decision record

After research, record the selected user group, observed situation, evidence IDs, unmet need, insight and final problem statement. Explain the boundary of the problem and what is deliberately out of scope. Do not mark DEFINE complete merely because a well-written HMW question exists.
