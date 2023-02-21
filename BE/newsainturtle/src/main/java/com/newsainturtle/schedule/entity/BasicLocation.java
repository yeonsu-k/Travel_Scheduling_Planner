package com.newsainturtle.schedule.entity;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Basic")
public class BasicLocation extends Location{
}
