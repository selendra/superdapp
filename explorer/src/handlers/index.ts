/**
 * Subsquid handlers.
 *
 * @module handlers
 */
import { balancesEventHandlers } from "./balances";
import { HandlerRegistry } from "./registry";
import { EventHandler, ExtrinsicHandler } from "../interfaces/handler";
import {
  contractsExtrinsicHandlers,
} from "./contracts";

const eventHandlers: Record<string, EventHandler> = {
  ...balancesEventHandlers,
};

const extrinsicHandlers: Record<string, ExtrinsicHandler> =
  contractsExtrinsicHandlers;

/**
 * The handlers registry.
 *
 * Holds extrinsic and event handlers.
 */
export const registry = new HandlerRegistry({
  extrinsicHandlers,
  eventHandlers,
});