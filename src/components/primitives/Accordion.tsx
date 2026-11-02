// accordion.tsx
import { Accordion as AccordionPrimitive } from '@base-ui/react';
import { ChevronDown } from 'lucide-react';
import { Children, isValidElement, type ReactNode, type ReactElement, ComponentPropsWithoutRef } from 'react';

export function AccordionHeader({ children }: { children: ReactNode }) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-4 py-3 text-left">
        {children}
        <ChevronDown className="size-4 shrink-0 opacity-60 transition-transform duration-200 group-data-[panel-open]:rotate-180" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

export function AccordionContent({ children }: { children: ReactNode }) {
  return (
    <AccordionPrimitive.Panel className="h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
      <div className="min-h-32 max-h-60 overflow-y-auto pb-4">{children}</div>
    </AccordionPrimitive.Panel>
  );
}


interface AccordionItemProps extends ComponentPropsWithoutRef<'div'> {
  children: [
    ReactElement<typeof AccordionHeader>,
    ReactElement<typeof AccordionContent>
  ];
  value?: string;
}

interface AccordionRootProps extends ComponentPropsWithoutRef<'div'> {
    children: ReactNode
    defaultValue: any[]
}

export function AccordionItem({ children, className, value }: AccordionItemProps) {
  if (process.env.NODE_ENV !== 'production') {
    const allowed = [AccordionHeader, AccordionContent];
    Children.forEach(children, (child) => {
      if (!isValidElement(child) || !allowed.includes(child.type as any)) {
        const name = isValidElement(child)
          ? typeof child.type === 'string'
            ? child.type
            : (child.type as any)?.displayName ?? (child.type as any)?.name
          : String(child);
        throw new Error(
          `AccordionItem solo acepta <AccordionHeader> y <AccordionContent> como children. Recibido: <${name}>`
        );
      }
    });
  }

  return (
    <AccordionPrimitive.Item className={`${className} border-b border-neutral-950 dark:border-neutral-300`} value={value}>{children}</AccordionPrimitive.Item>
  );
}

export function Accordion({ children, defaultValue, className }: AccordionRootProps) {
  return (
    <AccordionPrimitive.Root className={`${className}`} defaultValue={defaultValue}>
        {children}
    </AccordionPrimitive.Root>
    )
}