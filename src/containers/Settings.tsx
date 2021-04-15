import React, { useContext } from 'react';
import Button from '../components/Button';
import { ModalContext } from '../contexts/ModalContext';
import { IModal } from '../hooks/useModal';

type RadioInputProps = {
  id: string;
  name: string;
  value: string;
  isChecked?: boolean;
};

type LabelProps = {
  label: string;
  forInput: string;
  children: JSX.Element;
};

const Label = ({ label, children, forInput }: LabelProps) => (
  <label className="cursor-pointer mr-2 last:mr-auto" htmlFor={forInput}>
    {children}
    <span className="ml-2">{label}</span>
  </label>
);

const RadioInput = ({ id, name, value, isChecked }: RadioInputProps) => (
  <input
    checked={isChecked}
    type="radio"
    id={id}
    name={name}
    value={value}
    className="cursor-pointer rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
  />
);

const Settings = (): JSX.Element => {
  const { hideModal } = useContext<IModal>(ModalContext);

  const submit = (event: React.MouseEvent) => {
    event.preventDefault();
    hideModal();
  };

  return (
    <div className="w-1/2 h-1/2 bg-warmGray-100 cursor-auto border-0 rounded-lg flex flex-col">
      <div className="flex items-center p-5 border-b border-solid border-blueGray-200 rounded-t">
        <h3 className="text-3xl pt-2 font-semibold">Settings</h3>
      </div>
      <form className="p-6 h-4/5 flex flex-col flex-auto text-blueGray-500 text-lg leading-relaxed">
        <fieldset className="flex-1">
          <legend className="text-blueGray-700">Trim:</legend>
          <Label label="No Trim" forInput="no-trim">
            <RadioInput id="no-trim" value="no-trim" name="trim" isChecked />
          </Label>
          <Label label="Trim Domain" forInput="trim-domain">
            <RadioInput id="trim-domain" value="trim-domain" name="trim" />
          </Label>
          <Label label="Trim Path" forInput="trim-path">
            <RadioInput id="trim-path" value="trim-path" name="trim" />
          </Label>
        </fieldset>
        <fieldset className="flex-1">
          <legend className="text-blueGray-700">Copy current URL:</legend>
          <Label label="Copy" forInput="copy">
            <RadioInput
              id="copy"
              value="copy"
              name="copy-current-url"
              isChecked
            />
          </Label>
          <Label label="Not Copy" forInput="not-copy">
            <RadioInput
              id="not-copy"
              value="not-copy"
              name="copy-current-url"
            />
          </Label>
        </fieldset>
        <div className="flex items-center justify-end p-6 pb-0 pr-1 border-solid border-t border-blueGray-200 rounded-b">
          <Button clicked={hideModal} autoWidth>
            Close
          </Button>
          <Button type="submit" clicked={submit} autoWidth>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
