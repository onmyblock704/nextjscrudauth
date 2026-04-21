"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

//
// =========================
// ROOT (FIXED EXPORT)
// =========================
//

export const Combobox = ComboboxPrimitive.Root

//
// =========================
// VALUE
// =========================
//

export function ComboboxValue(
  props: ComboboxPrimitive.Value.Props
) {
  return (
    <ComboboxPrimitive.Value
      data-slot="combobox-value"
      {...props}
    />
  )
}

//
// =========================
// TRIGGER
// =========================
//

export function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn(
        "[&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}

      <ChevronDownIcon
        data-slot="combobox-trigger-icon"
        className="pointer-events-none size-4 text-muted-foreground"
      />
    </ComboboxPrimitive.Trigger>
  )
}

//
// =========================
// CLEAR
// =========================
//

export function ComboboxClear({
  className,
  ...props
}: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      render={<InputGroupButton variant="ghost" size="icon-xs" />}
      className={cn(className)}
      {...props}
    >
      <XIcon className="pointer-events-none" />
    </ComboboxPrimitive.Clear>
  )
}

//
// =========================
// INPUT
// =========================
//

export function ComboboxInput({
  className,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}: ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <InputGroup className={cn("w-auto", className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />

      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            asChild
            className="group-has-data-[slot=combobox-clear]/input-group:hidden"
            disabled={disabled}
          >
            <ComboboxTrigger />
          </InputGroupButton>
        )}

        {showClear && (
          <ComboboxClear disabled={disabled} />
        )}
      </InputGroupAddon>
    </InputGroup>
  )
}

//
// =========================
// CONTENT
// =========================
//

export function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset" | "anchor"
  >) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="isolate z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn(
            "relative max-h-96 w-(--anchor-width) overflow-hidden rounded-md bg-popover text-popover-foreground shadow-md",
            className
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}

//
// =========================
// LIST
// =========================
//

export function ComboboxList(
  props: ComboboxPrimitive.List.Props
) {
  return (
    <ComboboxPrimitive.List
      className="max-h-96 overflow-y-auto p-1"
      {...props}
    />
  )
}

//
// =========================
// ITEM
// =========================
//

export function ComboboxItem({
  className,
  children,
  ...props
}: ComboboxPrimitive.Item.Props) {
  return (
    <ComboboxPrimitive.Item
      className={cn(
        "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
        className
      )}
      {...props}
    >
      {children}

      <ComboboxPrimitive.ItemIndicator
        render={<span className="ml-auto" />}
      >
        <CheckIcon className="size-4" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  )
}

//
// =========================
// EXPORTS SUMMARY
// =========================
//

export {
  ComboboxPrimitive,
}