import React, {
  ChangeEvent,
  ChangeEventHandler,
  useContext,
  useState,
} from 'react';
import Button from '../components/Button';
import { ModalContext } from '../contexts/ModalContext';
import { IModal } from '../hooks/useModal';

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

enum TrimValue {
  NO_TRIM = 'NO_TRIM',
  TRIM_DOMAIN = 'TRIM_DOMAIN',
  TRIM_PATH = 'TRIM_PATH',
}

enum CopyCurrentURLValue {
  COPY = 'COPY',
  NOT_COPY = 'NOT_COPY',
}

const Label = ({ label, children, forInput }: LabelProps) => (
  <label className="cursor-pointer mr-2 last:mr-auto" htmlFor={forInput}>
    {children}
    <span className="ml-2 select-none">{label}</span>
  </label>
);

const RadioInput = ({
  id,
  name,
  value,
  isChecked,
  onChange,
}: RadioInputProps) => (
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

const Settings = (): JSX.Element => {
  const { hideModal } = useContext<IModal>(ModalContext);
  const [trimValue, setTrimValue] = useState<TrimValue>(TrimValue.NO_TRIM);
  const [copyValue, setCopyValue] = useState<CopyCurrentURLValue>(
    CopyCurrentURLValue.COPY
  );

  const submit = (event: React.MouseEvent) => {
    event.preventDefault();
    // save values
    hideModal();
  };

  const isTrimChecked: (value: TrimValue) => boolean = (value: TrimValue) => {
    return trimValue === value;
  };

  const onTrimChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setTrimValue(event.currentTarget.value as TrimValue);
  };

  const isCopyChecked: (value: CopyCurrentURLValue) => boolean = (
    value: CopyCurrentURLValue
  ) => {
    return copyValue === value;
  };

  const onCopyChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setCopyValue(event.currentTarget.value as CopyCurrentURLValue);
  };

  return (
    <div className="bg-warmGray-100 cursor-auto border-0 rounded-lg flex flex-col">
      <div className="flex items-center p-5 border-b border-solid border-blueGray-200 rounded-t">
        <h3 className="text-3xl pt-2 font-semibold">Settings</h3>
      </div>
      <form className="p-6 h-4/5 flex flex-col flex-auto text-blueGray-500 text-lg leading-relaxed">
        <fieldset className="flex-1">
          <legend className="text-blueGray-700">Trim:</legend>
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
        <fieldset className="flex-1">
          <legend className="text-blueGray-700">Copy current URL:</legend>
          <Label label="Copy" forInput={CopyCurrentURLValue.COPY}>
            <RadioInput
              id={CopyCurrentURLValue.COPY}
              value={CopyCurrentURLValue.COPY}
              name="copy"
              isChecked={isCopyChecked(CopyCurrentURLValue.COPY)}
              onChange={onCopyChange}
            />
          </Label>
          <Label label="Not Copy" forInput={CopyCurrentURLValue.NOT_COPY}>
            <RadioInput
              id={CopyCurrentURLValue.NOT_COPY}
              value={CopyCurrentURLValue.NOT_COPY}
              name="copy"
              isChecked={isCopyChecked(CopyCurrentURLValue.NOT_COPY)}
              onChange={onCopyChange}
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
