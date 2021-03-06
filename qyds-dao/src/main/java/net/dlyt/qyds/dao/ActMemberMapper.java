package net.dlyt.qyds.dao;

import net.dlyt.qyds.common.dto.ActMember;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActMemberMapper {
    int deleteByPrimaryKey(String actMemberId);

    int insert(ActMember record);

    int insertSelective(ActMember record);

    ActMember selectByPrimaryKey(String actMemberId);

    int updateByPrimaryKeySelective(ActMember record);

    int updateByPrimaryKey(ActMember record);

    List<ActMember> selectByActivityIds(@Param("activityIds")List<String> activityIds);
}