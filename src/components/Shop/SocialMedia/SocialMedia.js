import React from 'react';

import module from './SocialMedia.module.css';
import Space from '../Space/Space';
import Label from '../Label/Label';
import SelectLabel from '../SelectLabel/SelectLabel';
import { getSelect, getInput } from '../../../shared/utility';
import AddIcon from '../../UI/Icons/Add/Add';
import CrossIcon from '../../UI/Icons/Cross/Cross';

const socialMedia = (props) => {
  return (
    <div className={module.SocialMedia} >
      <Space />
      <Label no >Social Media Information(Optional)</Label>
      {
        props.socialLinks.map((link, i) => {
          let value = `${link.type} : @${link.link}`;
          return (
            <div className={module.LabelPair} key={i} >
              <div className={module.Left} style={{ width: '85%' }} >
                <SelectLabel value={value} width='90%' />
              </div>
              <div className={module.Left} style={{ width: '8%' }} >
                <div 
                  className={module.LabelIcon} 
                  onClick={() => props.onRmvCatClick('socialLinks', link.type)}
                    ><CrossIcon />
                </div>
              </div>
            </div> 
          );
        })
      }
      <div className={module.Pair} >
        <div className={module.Left1}  >
        {getSelect(props.linksType, props.linksTypeOptions, props.onSelectHandler, 'linksType')}
        </div>
        <div className={module.Left1}  >
          {getInput(props.link ,props.inputChangedHandler)}
        </div>
        <div className={module.Left} style={{ width: '8%' }} >
          <div 
            className={module.Icon} 
            onClick={() => props.onIconClick('socialLinks', { type: props.linksType.value, link: props.link.value }, 'linksType')}
              ><AddIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default socialMedia;
