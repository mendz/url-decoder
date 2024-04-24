import React, {
  ChangeEvent,
  ChangeEventHandler,
  useContext,
  useState,
} from 'react';
import Button from '../components/Button';
import { DecodeContext } from '../contexts/DecodeContext';
import { ModalContext } from '../contexts/ModalContext';
import {
  TrimValue,
  ShowCurrentURLButtonValue,
  ISettings,
  SettingsContext,
} from '../contexts/SettingsContext';

type RadioInputProps = {
  id: string;
  name: string;
  value: string;
  isChecked?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

type LabelProps = {
  label: string;
  forInput: string;
  children: JSX.Element;
};

function Label({ label, children, forInput }: LabelProps) {
  return (
    <label className="mr-2 last:mr-auto" htmlFor={forInput}>
      {children}
      <span className="ml-2 select-none">{label}</span>
    </label>
  );
}

function RadioInput({ id, name, value, isChecked, onChange }: RadioInputProps) {
  return (
    <input
      checked={isChecked}
      type="radio"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="cursor-pointer rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
    />
  );
}

function Settings(): JSX.Element {
  const { hideModal } = useContext(ModalContext);
  const { isDecode } = useContext(DecodeContext);
  const {
    setShowCurrentButtonValue: setGlobalCopyValue,
    setTrimValue: setGlobalTrimValue,
    showCurrentUrlButton: globalCopyValue,
    trimValue: globalTrimValue,
  } = useContext<ISettings>(SettingsContext);
  const [trimValue, setTrimValue] = useState<TrimValue>(globalTrimValue);
  const [copyValue, setCopyValue] =
    useState<ShowCurrentURLButtonValue>(globalCopyValue);

  function submit(event: React.MouseEvent) {
    event.preventDefault();
    // save values
    setGlobalCopyValue(copyValue);
    setGlobalTrimValue(trimValue);
    hideModal();
  }

  function isTrimChecked(value: TrimValue): boolean {
    return trimValue === value;
  }

  function onTrimChange(event: ChangeEvent<HTMLInputElement>) {
    setTrimValue(event.currentTarget.value as TrimValue);
  }

  function isCopyChecked(value: ShowCurrentURLButtonValue): boolean {
    return copyValue === value;
  }

  function onCopyChange(event: ChangeEvent<HTMLInputElement>) {
    setCopyValue(event.currentTarget.value as ShowCurrentURLButtonValue);
  }

  const legendText = isDecode ? 'Trim decoded URL' : 'Trim encoded URL';

  return (
    <div className="bg-stone-100 cursor-auto border-0 rounded-lg flex flex-col">
      <div className="flex items-center p-5 border-b border-solid border-sky-200 rounded-t">
        <h3 className="text-3xl pt-2 font-semibold">Settings</h3>
      </div>
      <form className="p-6 h-4/5 flex flex-col flex-auto text-sky-500 text-lg leading-relaxed">
        <fieldset className="flex-1">
          <legend className="text-sky-700">{legendText}:</legend>
          <Label label="No Trim" forInput={TrimValue.NO_TRIM}>
            <RadioInput
              id={TrimValue.NO_TRIM}
              value={TrimValue.NO_TRIM}
              name="trim"
              isChecked={isTrimChecked(TrimValue.NO_TRIM)}
              onChange={onTrimChange}
            />
          </Label>
          <Label label="Trim Domain" forInput={TrimValue.TRIM_DOMAIN}>
            <RadioInput
              id={TrimValue.TRIM_DOMAIN}
              value={TrimValue.TRIM_DOMAIN}
              name="trim"
              isChecked={isTrimChecked(TrimValue.TRIM_DOMAIN)}
              onChange={onTrimChange}
            />
          </Label>
          <Label label="Trim Path" forInput={TrimValue.TRIM_PATH}>
            <RadioInput
              id={TrimValue.TRIM_PATH}
              value={TrimValue.TRIM_PATH}
              name="trim"
              isChecked={isTrimChecked(TrimValue.TRIM_PATH)}
              onChange={onTrimChange}
            />
          </Label>
        </fieldset>
        <fieldset
          className={'flex-1'}
          disabled={!isDecode}
          title={!isDecode ? `Can't use while encoding` : ''}
        >
          <legend className="text-sky-700">Copy current URL button:</legend>
          <Label label="Not Show" forInput={ShowCurrentURLButtonValue.NOT_SHOW}>
            <RadioInput
              id={ShowCurrentURLButtonValue.NOT_SHOW}
              value={ShowCurrentURLButtonValue.NOT_SHOW}
              name="copy"
              isChecked={isCopyChecked(ShowCurrentURLButtonValue.NOT_SHOW)}
              onChange={onCopyChange}
            />
          </Label>
          <Label label="Show" forInput={ShowCurrentURLButtonValue.SHOW}>
            <RadioInput
              id={ShowCurrentURLButtonValue.SHOW}
              value={ShowCurrentURLButtonValue.SHOW}
              name="copy"
              isChecked={isCopyChecked(ShowCurrentURLButtonValue.SHOW)}
              onChange={onCopyChange}
            />
          </Label>
        </fieldset>
        <div className="flex items-center justify-end p-6 pb-0 pr-1 border-solid border-t border-sky-200 rounded-b">
          <Button
            className="mr-4"
            clicked={hideModal}
            autoWidth
            testId="button-close"
          >
            Close
          </Button>
          <Button type="submit" clicked={submit} autoWidth>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
