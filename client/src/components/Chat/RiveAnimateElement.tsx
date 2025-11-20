import { useRive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { sidePanelCollapsedState } from '~/common/sidePanel';
import { riveInputState, riveThinkingState } from '~/store/rive-inputs';
import { cn } from '~/utils';

function RiveAnimateElement() {
  const STATE_MACHINE = 'State Machine 1';

  const { rive, RiveComponent } = useRive({
    src: '/assets/mascotNarxoz.riv',
    stateMachines: STATE_MACHINE,
    autoplay: true,
  });

  const wave = useStateMachineInput(rive, STATE_MACHINE, 'isWave');
  const stopWave = useStateMachineInput(rive, STATE_MACHINE, 'stopWave');

  const isRead = useStateMachineInput(rive, STATE_MACHINE, 'isRead');
  const stopRead = useStateMachineInput(rive, STATE_MACHINE, 'stopRead');

  const isThinking = useStateMachineInput(rive, STATE_MACHINE, 'isThinking');
  const stopThinking = useStateMachineInput(rive, STATE_MACHINE, 'stopThinking');

  const riveInput = useRecoilValue(riveInputState);
  const riveThinking = useRecoilValue(riveThinkingState);

  const collapsed = useRecoilValue(sidePanelCollapsedState);

  useEffect(() => {
    if (!rive || !wave || !stopWave) return;

    requestAnimationFrame(() => {
      wave.fire();
    });

    const timer = setTimeout(() => {
      stopWave.fire();
    }, 7000);

    return () => clearTimeout(timer);
  }, [rive, wave, stopWave]);

  useEffect(() => {
    if (!rive || !isRead || !stopRead) return;

    requestAnimationFrame(() => {
      riveInput.trim().length > 0 ? isRead.fire() : stopRead.fire();
    });
  }, [rive, riveInput, isRead, stopRead]);

  useEffect(() => {
    if (!rive || !isThinking || !stopThinking) return;

    requestAnimationFrame(() => {
      riveThinking ? isThinking.fire() : stopThinking.fire();
    });
  }, [rive, riveThinking, isThinking, stopThinking]);

  return (
    <div
      className={cn(
        'mascot-btn-wrapper absolute bottom-5 right-0 z-50 ml-5 hidden size-fit 2xl:flex',
        !collapsed && '-right-4',
      )}
    >
      <div className="mascot-wrapper size-40">
        <RiveComponent />
      </div>
    </div>
  );
}

export default RiveAnimateElement;
