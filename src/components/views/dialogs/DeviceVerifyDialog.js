/*
Copyright 2016 OpenMarket Ltd
Copyright 2017 Vector Creations Ltd

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import MatrixClientPeg from '../../../MatrixClientPeg';
import sdk from '../../../index';

export default function DeviceVerifyDialog(props) {
    const QuestionDialog = sdk.getComponent("dialogs.QuestionDialog");

    const body = (
        <div>
            <p>
                To verify that this device can be trusted, please contact its
                owner using some other means (e.g. in person or a phone call)
                and ask them whether the key they see in their User Settings
                for this device matches the key below:
            </p>
            <div className="mx_UserSettings_cryptoSection">
                <ul>
                    <li><label>Device name:</label> <span>{ props.device.getDisplayName() }</span></li>
                    <li><label>Device ID:</label> <span><code>{ props.device.deviceId}</code></span></li>
                    <li><label>Device key:</label> <span><code><b>{ props.device.getFingerprint() }</b></code></span></li>
                </ul>
            </div>
            <p>
                If it matches, press the verify button below.
                If it doesnt, then someone else is intercepting this device
                and you probably want to press the blacklist button instead.
            </p>
            <p>
                In future this verification process will be more sophisticated.
            </p>
        </div>
    );

    function onFinished(confirm) {
        if (confirm) {
            MatrixClientPeg.get().setDeviceVerified(
                props.userId, props.device.deviceId, true,
            );
        }
        props.onFinished(confirm);
    }

    return (
        <QuestionDialog
            title="Verify device"
            description={body}
            button="I verify that the keys match"
            onFinished={onFinished}
        />
    );
}

DeviceVerifyDialog.propTypes = {
    userId: React.PropTypes.string.isRequired,
    device: React.PropTypes.object.isRequired,
    onFinished: React.PropTypes.func.isRequired,
};
