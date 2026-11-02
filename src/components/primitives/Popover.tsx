// popover.tsx
'use client';

import { Popover as PopoverPrimitive } from '@base-ui/react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export function Popover(props: ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root {...props} />;
}

export function PopoverTrigger({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>) {
  return (
    <PopoverPrimitive.Trigger className={className} {...props}>
      {children}
    </PopoverPrimitive.Trigger>
  );
}

interface PopoverContentProps {
  children: ReactNode;
  className?: string;
  side?: ComponentPropsWithoutRef<typeof PopoverPrimitive.Positioner>['side'];
  align?: ComponentPropsWithoutRef<typeof PopoverPrimitive.Positioner>['align'];
  sideOffset?: number;
  alignOffset?: number;
  /* Animación de apertura: la persiana original, un barrido que cae desde el
     frame hacia abajo, o (por defecto) el escalado simple de Base UI. */
  reveal?: 'blinds' | 'drop';
  /* Estado de apertura del popover. Necesario con `reveal`: la animación se
     dispara desde React, no desde los data-* de Base UI. */
  open?: boolean;
}

export function PopoverContent({
  children,
  className,
  side = 'bottom',
  align = 'end',
  sideOffset = 12,
  alignOffset = 0,
  reveal,
  open = false,
}: PopoverContentProps) {
  /* La superficie del panel (fondo, borde, sombra) vive en el envoltorio y no
     en el Popup cuando hay animación propia: Base UI marca los popovers
     abiertos con clic como `data-instant` y les pone `transition: none` en
     línea, lo que anularía la máscara/el clip-path. Un hijo queda fuera de
     esa regla. */
  const surface = 'bg-surface-overlay/95 shadow-2xl shadow-black/40 backdrop-blur-xl';
  /* Sin reveal: panel flotante normal, con los cuatro bordes. Con reveal:
     el panel nace pegado a la esquina del frame (mismo x/y que su borde),
     así que el propio borde del frame hace de borde superior e izquierdo —
     pintar uno aquí encima solo duplicaría la línea. En mobile el panel
     también llega hasta el borde derecho del frame, así que ese lado
     tampoco lleva borde propio hasta `sm:`, donde vuelve a flotar separado. */
  const border = reveal ? 'border-main sm:border-r sm:border-b' : 'border border-main';

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner side={side} align={align} sideOffset={sideOffset} alignOffset={alignOffset} className="z-19">
        {reveal === 'drop' ? (
          /* La transition tiene que vivir en el propio Popup: Base UI decide
             cuánto esperar para desmontar leyendo Popup.getAnimations(), que
             NO mira los hijos. Puesta en un div de dentro, Base UI nunca la
             ve y desmonta al instante — el cierre no se animaba por esto. */
          <PopoverPrimitive.Popup
            className={`${border} ${surface} [clip-path:inset(0_0_0%_0)] transition-[clip-path] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none data-[starting-style]:[clip-path:inset(0_0_100%_0)] data-[ending-style]:[clip-path:inset(0_0_100%_0)] ${className ?? ''}`}
          >
            {children}
          </PopoverPrimitive.Popup>
        ) : reveal === 'blinds' ? (
          <PopoverPrimitive.Popup className={className}>
            {/* `key` fuerza un nodo nuevo en cada apertura: Base UI reutiliza
                el popup, y sin recrear el envoltorio el @keyframes solo se
                reproduciría la primera vez. */}
            <div key={open ? 'abierto' : 'cerrado'} className={`${reveal} h-full w-full ${border} ${surface}`}>
              {children}
            </div>
          </PopoverPrimitive.Popup>
        ) : (
          <PopoverPrimitive.Popup
            className={`${border} ${surface} transition-[transform,opacity] duration-150 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 ${className ?? ''}`}
          >
            {children}
          </PopoverPrimitive.Popup>
        )}
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

export const PopoverClose = PopoverPrimitive.Close;
